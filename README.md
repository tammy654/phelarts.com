phelarts.com

## Firebase Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "phelarts-website"
3. Enable Firestore Database
4. Enable Storage (optional)

### 2. Configure Environment Variables
1. Copy `.env.local` and fill in your Firebase configuration
2. Get your config from Firebase Project Settings > General > Your apps
3. Add your Firebase config values to `.env.local`

### 3. EmailJS Setup
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail recommended)
3. Create email template with these variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{reply_to}}`
4. Add your EmailJS credentials to `.env.local`

### 4. Firestore Collections
The app will automatically create these collections:
- `bookings` - Book a Call form submissions
- `contacts` - Contact form submissions  
- `newsletter` - Newsletter subscriptions

### 5. Security Rules
Deploy the included `firestore.rules` to your Firebase project:
```bash
firebase deploy --only firestore:rules
```

### 6. Features Implemented
- ✅ Firebase Firestore integration
- ✅ EmailJS email notifications
- ✅ Form validation with toast notifications
- ✅ Loading states and error handling
- ✅ Auto-confirmation emails to users
- ✅ Responsive Google Forms newsletter integration
- ✅ Secure environment variable configuration
