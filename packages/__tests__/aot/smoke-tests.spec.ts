import { DI, LoggerConfiguration, LogLevel, ColorOptions, Registration } from '@aurelia/kernel';
import { IFileSystem, FileKind, ServiceHost, $Undefined, $SourceFile } from '@aurelia/aot';
import { VirtualFileSystem } from './virtual-file-system';
import { assert } from '@aurelia/testing';

// NOTE: These tests are not meant to be even close to exhaustive. That's what the 262 test suite is for.
// These tests exist solely for having an easy way to quickly test some high-level things when a feature is not yet ready for exposure to the 262 test suite.

describe('AOT (smoke tests)', function () {
  async function execute(content: string) {
    const container = DI.createContainer();
    container.register(
      LoggerConfiguration.create(console, LogLevel.debug, ColorOptions.colors),
      Registration.singleton(IFileSystem, VirtualFileSystem),
    );

    const host = new ServiceHost(container);

    const result = await host.executeSpecificFile({
      shortName: '',
      shortPath: '',
      kind: FileKind.Script,
      path: '',
      dir: '',
      rootlessPath: '',
      name: '',
      ext: '',
      async getContent() {
        return content;
      },
      getContentSync() {
        return content;
      },
    });

    if (!result.isUndefined) {
      assert.fail(`Evaluation error`);
    }

    return ((result as $Undefined).sourceNode as $SourceFile).ExecutionResult;
  }

  it('simple return statement with binary expression', async function () {
    const result = await execute(`
      return 1 + 1;
    `);

    assert.strictEqual(result['[[Value]]'], 2);
  });

  it('simple if statement with binary expression', async function () {
    const result = await execute(`
      if (true) {
        return 1 + 1;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 2);
  });

  it('simple if/else statement with binary expression', async function () {
    const result = await execute(`
      if (false) {
        return 1 + 1;
      } else {
        return 5;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 5);
  });

  it('simple function declaration with binary expression', async function () {
    const result = await execute(`
      function foo() {
        return 1 + 1;
      }
      return foo();
    `);

    assert.strictEqual(result['[[Value]]'], 2);
  });

  it('simple function declaration with parameters and binary expression', async function () {
    const result = await execute(`
      function foo(a, b) {
        return a + b;
      }
      return foo(1, 1);
    `);

    assert.strictEqual(result['[[Value]]'], 2);
  });

  it('try catch with thrown error', async function () {
    const result = await execute(`
      try {
        throw new Error();
      } catch {
        return 1;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 1);
  });

  it('try catch with reference error', async function () {
    const result = await execute(`
      try {
        foo.bar;
      } catch {
        return 1;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 1);
  });

  it('try catch with no error', async function () {
    const result = await execute(`
      try {
        return 42;
      } catch {
        return 1;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 42);
  });

  it('simple switch', async function () {
    const result = await execute(`
      switch(1){
        case 1:
          return 1;
        default:
          return 2;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 1);
  });

  it('switch with default', async function () {
    const result = await execute(`
      switch(2){
        case 1:
          return 1;
        default:
          return 2;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 2);
  });

  it('switch with default in the middle', async function () {
    const result = await execute(`
      switch(3){
        case 1:
          return 1;
        default:
          return 2;
        case 3:
          return 3;
      }
    `);

    assert.strictEqual(result['[[Value]]'], 3);
  });
});
