import {
  EnumDeclaration,
  EnumMember,
  InterfaceDeclaration,
  ModifierFlags,
  SyntaxKind,
  TypeAliasDeclaration,
  VariableStatement,
  createVariableStatement,
  createVariableDeclarationList,
  createVariableDeclaration,
  createCall,
  createFunctionExpression,
  createToken,
  createModifier,
  createParameter,
  createBlock,
  createLogicalOr,
  createAssignment,
  createObjectLiteral,
  createExpressionStatement,
  createElementAccess,
  createNumericLiteral,
  Identifier,
  createStringLiteral,
  createReturn,
  createIdentifier,
} from 'typescript';
import {
  PLATFORM,
  ILogger,
} from '@aurelia/kernel';
import {
  Realm,
} from '../realm';
import {
  $String,
} from '../types/string';
import {
  I$Node,
  Context,
  $$ESDeclaration,
  $NodeWithStatements,
  modifiersToModifierFlags,
  hasBit,
  $identifier,
  $heritageClauseList,
  $$PropertyName,
  $$AssignmentExpressionOrHigher,
  $$propertyName,
  $assignmentExpression,
  $AssignmentExpressionNode,
  $i,
  $$ESVarDeclaration,
  TransformationContext,
  transformModifiers,
} from './_shared';
import {
  ExportEntryRecord,
  $$ESModuleOrScript,
} from './modules';
import {
  $Identifier,
} from './expressions';
import {
  $HeritageClause,
} from './classes';

const {
  emptyArray,
} = PLATFORM;

export class $InterfaceDeclaration implements I$Node {
  public get $kind(): SyntaxKind.InterfaceDeclaration { return SyntaxKind.InterfaceDeclaration; }

  public readonly modifierFlags: ModifierFlags;

  public readonly BoundNames: readonly [$String];
  public readonly VarDeclaredNames: readonly $String[] = emptyArray;
  public readonly VarScopedDeclarations: readonly $$ESVarDeclaration[] = emptyArray;
  public readonly LexicallyDeclaredNames: readonly $String[] = emptyArray;
  public readonly LexicallyScopedDeclarations: readonly $$ESDeclaration[] = emptyArray;

  public readonly ExportedBindings: readonly $String[];
  public readonly ExportedNames: readonly $String[];
  public readonly ExportEntries: readonly ExportEntryRecord[];

  public readonly TypeDeclarations: readonly [$InterfaceDeclaration];
  public readonly IsType: true = true;

  public readonly $name: $Identifier;
  public readonly $heritageClauses: readonly $HeritageClause[];

  public constructor(
    public readonly node: InterfaceDeclaration,
    public readonly parent: $NodeWithStatements,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly mos: $$ESModuleOrScript = parent.mos,
    public readonly realm: Realm = parent.realm,
    public readonly depth: number = parent.depth + 1,
    public readonly logger: ILogger = parent.logger,
    public readonly path: string = `${parent.path}${$i(idx)}.InterfaceDeclaration`,
  ) {
    const intrinsics = realm['[[Intrinsics]]'];

    ctx |= Context.InTypeElement;

    const modifierFlags = this.modifierFlags = modifiersToModifierFlags(node.modifiers);

    if (hasBit(modifierFlags, ModifierFlags.Export)) {
      ctx |= Context.InExport;
    }

    const $name = this.$name = $identifier(node.name, this, ctx, -1);
    this.$heritageClauses = $heritageClauseList(node.heritageClauses, this, ctx);

    const BoundNames = this.BoundNames = $name.BoundNames;
    this.TypeDeclarations = [this];

    if (hasBit(ctx, Context.InExport)) {
      const [localName] = BoundNames;

      this.ExportedBindings = BoundNames;
      this.ExportedNames = BoundNames;
      this.ExportEntries = [
        new ExportEntryRecord(
          /* source */this,
          /* ExportName */localName,
          /* ModuleRequest */intrinsics.null,
          /* ImportName */intrinsics.null,
          /* LocalName */localName,
        ),
      ];
    } else {
      this.ExportedBindings = emptyArray;
      this.ExportedNames = emptyArray;
      this.ExportEntries = emptyArray;
    }
  }

  public transform(tctx: TransformationContext): undefined {
    return void 0;
  }
}

export class $TypeAliasDeclaration implements I$Node {
  public get $kind(): SyntaxKind.TypeAliasDeclaration { return SyntaxKind.TypeAliasDeclaration; }

  public readonly modifierFlags: ModifierFlags;

  public readonly BoundNames: readonly [$String];
  public readonly VarDeclaredNames: readonly $String[] = emptyArray;
  public readonly VarScopedDeclarations: readonly $$ESVarDeclaration[] = emptyArray;
  public readonly LexicallyDeclaredNames: readonly $String[] = emptyArray;
  public readonly LexicallyScopedDeclarations: readonly $$ESDeclaration[] = emptyArray;

  public readonly ExportedBindings: readonly $String[];
  public readonly ExportedNames: readonly $String[];
  public readonly ExportEntries: readonly ExportEntryRecord[];

  public readonly TypeDeclarations: readonly [$TypeAliasDeclaration];
  public readonly IsType: true = true;

  public readonly $name: $Identifier;

  public constructor(
    public readonly node: TypeAliasDeclaration,
    public readonly parent: $NodeWithStatements,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly mos: $$ESModuleOrScript = parent.mos,
    public readonly realm: Realm = parent.realm,
    public readonly depth: number = parent.depth + 1,
    public readonly logger: ILogger = parent.logger,
    public readonly path: string = `${parent.path}${$i(idx)}.TypeAliasDeclaration`,
  ) {
    const intrinsics = realm['[[Intrinsics]]'];

    ctx |= Context.InTypeElement;

    const modifierFlags = this.modifierFlags = modifiersToModifierFlags(node.modifiers);

    if (hasBit(modifierFlags, ModifierFlags.Export)) {
      ctx |= Context.InExport;
    }

    const $name = this.$name = $identifier(node.name, this, ctx, -1);

    const BoundNames = this.BoundNames = $name.BoundNames;
    this.TypeDeclarations = [this];

    if (hasBit(ctx, Context.InExport)) {
      const [localName] = BoundNames;

      this.ExportedBindings = BoundNames;
      this.ExportedNames = BoundNames;
      this.ExportEntries = [
        new ExportEntryRecord(
          /* source */this,
          /* ExportName */localName,
          /* ModuleRequest */intrinsics.null,
          /* ImportName */intrinsics.null,
          /* LocalName */localName,
        ),
      ];
    } else {
      this.ExportedBindings = emptyArray;
      this.ExportedNames = emptyArray;
      this.ExportEntries = emptyArray;
    }
  }

  public transform(tctx: TransformationContext): undefined {
    return void 0;
  }
}

export function $enumMemberList(
  nodes: readonly EnumMember[],
  parent: $EnumDeclaration,
  ctx: Context,
): readonly $EnumMember[] {
  if (nodes === void 0 || nodes.length === 0) {
    return emptyArray;
  }

  const len = nodes.length;
  const $nodes: $EnumMember[] = Array(len);
  for (let i = 0; i < len; ++i) {
    $nodes[i] = new $EnumMember(nodes[i], parent, ctx, i);
  }
  return $nodes;
}

export class $EnumDeclaration implements I$Node {
  public get $kind(): SyntaxKind.EnumDeclaration { return SyntaxKind.EnumDeclaration; }

  public readonly modifierFlags: ModifierFlags;

  public readonly BoundNames: readonly [$String];
  public readonly VarDeclaredNames: readonly $String[] = emptyArray;
  public readonly VarScopedDeclarations: readonly $$ESVarDeclaration[] = emptyArray;
  public readonly LexicallyDeclaredNames: readonly $String[] = emptyArray;
  public readonly LexicallyScopedDeclarations: readonly $$ESDeclaration[] = emptyArray;

  public readonly ExportedBindings: readonly $String[];
  public readonly ExportedNames: readonly $String[];
  public readonly ExportEntries: readonly ExportEntryRecord[];

  public readonly TypeDeclarations: readonly [$EnumDeclaration];
  public readonly IsType: true = true;

  public readonly $name: $Identifier;
  public readonly $members: readonly $EnumMember[];

  public constructor(
    public readonly node: EnumDeclaration,
    public readonly parent: $NodeWithStatements,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly mos: $$ESModuleOrScript = parent.mos,
    public readonly realm: Realm = parent.realm,
    public readonly depth: number = parent.depth + 1,
    public readonly logger: ILogger = parent.logger,
    public readonly path: string = `${parent.path}${$i(idx)}.EnumDeclaration`,
  ) {
    const intrinsics = realm['[[Intrinsics]]'];

    const modifierFlags = this.modifierFlags = modifiersToModifierFlags(node.modifiers);

    if (hasBit(modifierFlags, ModifierFlags.Export)) {
      ctx |= Context.InExport;
    }

    const $name = this.$name = $identifier(node.name, this, ctx, -1);
    this.$members = $enumMemberList(node.members, this, ctx);

    const BoundNames = this.BoundNames = $name.BoundNames;
    this.TypeDeclarations = [this];

    if (hasBit(ctx, Context.InExport)) {
      const [localName] = BoundNames;

      this.ExportedBindings = BoundNames;
      this.ExportedNames = BoundNames;
      this.ExportEntries = [
        new ExportEntryRecord(
          /* source */this,
          /* ExportName */localName,
          /* ModuleRequest */intrinsics.null,
          /* ImportName */intrinsics.null,
          /* LocalName */localName,
        ),
      ];
    } else {
      this.ExportedBindings = emptyArray;
      this.ExportedNames = emptyArray;
      this.ExportEntries = emptyArray;
    }
  }

  public transform(tctx: TransformationContext): VariableStatement {
    const node = this.node;
    // TODO: inline const enums instead
    return createVariableStatement(
      /* modifiers       */node.modifiers === void 0 ? void 0 : transformModifiers(node.modifiers),
      /* declarationList */createVariableDeclarationList(
        /* declarations    */[
          createVariableDeclaration(
            /* name            */node.name,
            /* type            */void 0,
            /* initializer     */createCall(
              /* expression      */createFunctionExpression(
                /* modifiers       */void 0,
                /* asteriskToken   */void 0,
                /* name            */void 0,
                /* typeParameters  */void 0,
                /* parameters      */[
                  createParameter(
                    /* decorators      */void 0,
                    /* modifiers       */void 0,
                    /* dotDotDotToken  */void 0,
                    /* name            */node.name,
                  ),
                ],
                /* typeNode        */void 0,
                /* body            */createBlock(
                  /* statements      */[
                    ...node.members.map(
                      (m, i) => createExpressionStatement(
                        /* expression      */createAssignment(
                          /* left            */createElementAccess(
                            /* expression      */node.name,
                            /* index           */createAssignment(
                              /* left            */createElementAccess(
                                /* expression      */node.name,
                                /* index           */createStringLiteral((m.name as Identifier).text),
                              ),
                              /* right           */m.initializer === void 0
                                ? createNumericLiteral(i.toString())
                                : m.initializer,
                            ),
                          ),
                          /* right           */createStringLiteral((m.name as Identifier).text),
                        ),
                      ),
                    ),
                    createReturn(node.name),
                  ],
                  /* multiLine       */true,
                ),
              ),
              /* typeArguments   */void 0,
              /* argumentsArray  */[
                createLogicalOr(
                  /* left            */node.name,
                  /* right           */createAssignment(
                    /* left            */node.name,
                    /* right           */createObjectLiteral(),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

export class $EnumMember implements I$Node {
  public get $kind(): SyntaxKind.EnumMember { return SyntaxKind.EnumMember; }

  public readonly $name: $$PropertyName;
  public readonly $initializer: $$AssignmentExpressionOrHigher | undefined;

  public constructor(
    public readonly node: EnumMember,
    public readonly parent: $EnumDeclaration,
    public readonly ctx: Context,
    public readonly idx: number,
    public readonly mos: $$ESModuleOrScript = parent.mos,
    public readonly realm: Realm = parent.realm,
    public readonly depth: number = parent.depth + 1,
    public readonly logger: ILogger = parent.logger,
    public readonly path: string = `${parent.path}${$i(idx)}.EnumMember`,
  ) {
    this.$name = $$propertyName(node.name, this, ctx | Context.IsMemberName, -1);
    this.$initializer = $assignmentExpression(node.initializer as $AssignmentExpressionNode, this, ctx, -1);
  }
}
