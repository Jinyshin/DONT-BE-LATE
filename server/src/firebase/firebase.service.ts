import { Injectable } from '@nestjs/common';
import * as admin from "firebase-admin";

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
