import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class HashService {
  getHash(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
