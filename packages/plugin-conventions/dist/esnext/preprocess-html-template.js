import { kebabCase } from '@aurelia/kernel';
import modifyCode from 'modify-code';
import * as path from 'path';
import { stripMetaData } from './strip-meta-data';
// stringModuleWrap is to deal with pure css text module import in shadowDOM mode.
// For webpack:
//   import d0 from '!!raw-loader!./foo.css';
// For dumber/requirejs:
//   import d0 from 'text!./foo.css';
// We cannot use
//   import d0 from './foo.css';
// because most bundler by default will inject that css into HTML head.
export function preprocessHtmlTemplate(unit, options) {
    const name = kebabCase(path.basename(unit.path, path.extname(unit.path)));
    const stripped = stripMetaData(unit.contents);
    const { html, deps, containerless, bindables } = stripped;
    let { shadowMode } = stripped;
    if (unit.filePair) {
        const basename = path.basename(unit.filePair, path.extname(unit.filePair));
        if (!deps.some(dep => options.cssExtensions.some(e => dep === './' + basename + e))) {
            // implicit dep ./foo.css for foo.html
            deps.unshift('./' + unit.filePair);
        }
    }
    if (options.defaultShadowOptions && !shadowMode) {
        shadowMode = options.defaultShadowOptions.mode;
    }
    const viewDeps = [];
    const statements = [];
    let registrationImported = false;
    // Turn off ShadowDOM for invalid element
    if (!name.includes('-') && shadowMode) {
        shadowMode = null;
        const error = `WARN: ShadowDOM is disabled for ${unit.path}. ShadowDOM requires element name to contain a dash (-), you have to refactor <${name}> to something like <lorem-${name}>.`;
        // tslint:disable-next-line:no-console
        console.warn(error);
        statements.push(`console.warn(${JSON.stringify(error)});\n`);
    }
    deps.forEach((d, i) => {
        const ext = path.extname(d);
        if (options.templateExtensions.includes(ext)) {
            statements.push(`import * as h${i} from ${s(d)};\nconst d${i} = h${i}.getHTMLOnlyElement();\n`);
            viewDeps.push(`d${i}`);
        }
        else if (ext && ext !== '.js' && ext !== '.ts') {
            // Wrap all other unknown resources (including .css, .scss) in defer.
            if (!registrationImported) {
                statements.push(`import { Registration } from '@aurelia/kernel';\n`);
                registrationImported = true;
            }
            const isCssResource = options.cssExtensions.indexOf(ext) !== -1;
            let stringModuleId = d;
            if (isCssResource && shadowMode && options.stringModuleWrap) {
                stringModuleId = options.stringModuleWrap(d);
            }
            statements.push(`import d${i} from ${s(stringModuleId)};\n`);
            viewDeps.push(`Registration.defer('${isCssResource ? '.css' : ext}', d${i})`);
        }
        else {
            statements.push(`import * as d${i} from ${s(d)};\n`);
            viewDeps.push(`d${i}`);
        }
    });
    const m = modifyCode('', unit.path);
    m.append(`import { CustomElement } from '@aurelia/runtime';\n`);
    statements.forEach(st => m.append(st));
    m.append(`export const name = ${s(name)};
export const template = ${s(html)};
export default template;
export const dependencies = [ ${viewDeps.join(', ')} ];
`);
    if (shadowMode) {
        m.append(`export const shadowOptions = { mode: '${shadowMode}' };\n`);
    }
    if (containerless) {
        m.append(`export const containerless = true;\n`);
    }
    if (Object.keys(bindables).length) {
        m.append(`export const bindables = ${JSON.stringify(bindables)};\n`);
    }
    m.append(`let _e;
export function getHTMLOnlyElement() {
  if (!_e) {
    _e = CustomElement.define({ name, template, dependencies${shadowMode ? ', shadowOptions' : ''}${containerless ? ', containerless' : ''}${Object.keys(bindables).length ? ', bindables' : ''} });
  }
  return _e;
}
`);
    const { code, map } = m.transform();
    map.sourcesContent = [unit.contents];
    return { code, map };
}
function s(str) {
    return JSON.stringify(str);
}
//# sourceMappingURL=preprocess-html-template.js.map