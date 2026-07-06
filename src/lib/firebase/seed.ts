import { adminAuth, adminDb } from './admin.js';

async function seed() {
  console.log('🚀 Starting seeding process...');

  const users = [
    {
      email: 'dg@nehemiahlab.com',
      password: 'password123',
      full_name: 'Directeur Général',
      role: 'DG',
      center_id: 'global',
    },
    {
      email: 'coord@nehemiahlab.com',
      password: 'password123',
      full_name: 'Coordinateur Lomé',
      role: 'COORDINATOR',
      center_id: 'center-1',
    },
    {
      email: 'teacher@nehemiahlab.com',
      password: 'password123',
      full_name: 'Formateur Junior',
      role: 'TEACHER',
      center_id: 'center-1',
    },
  ];

  for (const user of users) {
    try {
      // 1. Create user in Firebase Auth
      let userRecord;
      try {
        userRecord = await adminAuth.createUser({
          email: user.email,
          password: user.password,
          displayName: user.full_name,
        });
        console.log(`✅ Created Auth user: ${user.email}`);
      } catch (e: any) {
        if (e.code === 'auth/email-already-exists') {
          console.log(`ℹ️ User ${user.email} already exists, skipping Auth creation.`);
          const existingUser = await adminAuth.getUser(user.email);
          userRecord = existingUser;
        } else {
          throw e;
        }
      }

      // 2. Create profile in Firestore
      await adminDb.collection('profiles').doc(userRecord.uid).set({
        full_name: user.full_name,
        role: user.role,
        center_id: user.center_id,
        email: user.email,
        created_at: new Date().toISOString(),
      }, { merge: true });

      console.log(`✅ Created Firestore profile for: ${user.email}`);
    } catch (error) {
      console.error(`❌ Error seeding user ${user.email}:`, error);
    }
  }

  console.log('✨ Seeding completed successfully!');
  process.exit(0);
}

seed();