import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { basename, join } from 'path';

export class FsHelper {
  /**
   * check it out levi, its `cp -R` :o
   * @param src path to source file/directory
   * @param dest path to destination file/directory
   */
  static async copyRecursive(src: string, dest: string): Promise<void> {
    const exists = await stat(src);
    const isDir = exists.isDirectory();
    if (exists && isDir) {
      await mkdir(dest);
      const copyPromises = (await readdir(src)).map(async (child) => {
        this.copyRecursive(join(src, child), join(dest, child));
      });
      await Promise.all(copyPromises);
    } else if (exists) {
      await copyFile(src, dest);
    } else {
      throw new EvalError('invalid src supplied');
    }
  }

  static async createFileTree(src: string, tree: Object = {}): Promise<any> {
    const fileStat = await stat(src);
    const isDir = fileStat.isDirectory();
    if (fileStat && isDir) {
      tree[basename(src)] = {};
      const readPromises = (await readdir(src)).map(async (child) =>
        this.createFileTree(join(src, child), tree[basename(src)]),
      );
      await Promise.all(readPromises);
    } else if (fileStat) {
      tree[basename(src)] = fileStat.size;
    }
    return tree;
  }
}
