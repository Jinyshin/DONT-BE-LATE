import * as admin from "firebase-admin";
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
    readonly firebaseRef: admin.app.App;

    constructor() {
        try {
            this.firebaseRef = admin.initializeApp({
                credential: admin.credential.applicationDefault()
            });
        } catch (e) {
            throw new Error(`firebase 초기화 실패: ${e}`);
        }
    }
}
