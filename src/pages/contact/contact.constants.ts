
export const MAP_TEXTS = {
  HERO: {
    TITLE: 'Contact Us',
    DESCRIPTION: 'We\'re here to help with all your real estate needs. Reach out to our team today.',
  },
  SEND_US_A_MESSAGE: {
    TITLE: 'Send us a Message',
    DESCRIPTION: 'Have a question or want to schedule a viewing? Fill out the form below and our team will get back to you as soon as possible.',
  },
  OUR_OFFICE: {
    TITLE: 'Our Office',
    ADDRESS: {
      TITLE: 'Address',
      INFO: [
        '123 Real Estate Avenue',
        'Cityville, ST 12345',
      ],
    },
    PHONE: {
      TITLE: 'Phone',
      INFO: [
        '(555) 123-4567',
        '(555) 987-6543 (Sales)',
      ],
    },
    EMAIL: {
      TITLE: 'Email',
      INFO: [
        'info@realestateagency.com',
        'support@realestateagency.com',
      ],
    },
    OPENING_HOURS: {
      TITLE: 'Business Hours',
      INFO: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed',
      ],
    },
  },
  FORM: {
    NAME: {
      FIELD_NAME: 'name',
      LABEL: 'Full Name',
      PLACEHOLDER: 'John Doe',
      ERROR: {
        MIN_LENGTH: "Name must be at least 2 characters",
      },
    },
    EMAIL: {
      FIELD_NAME: 'email',
      LABEL: 'Email',
      PLACEHOLDER: 'john.doe@example.com',
      ERROR: {
        INVALID: "Please enter a valid email address",
      },
    },
    PHONE: {
      FIELD_NAME: 'phone',
      LABEL: 'Phone',
      PLACEHOLDER: '(555) 123-4567',
      ERROR: {
        MIN_LENGTH: "Please enter a valid phone number",
      },
    },
    SUBJECT: {
      FIELD_NAME: 'subject',
      LABEL: 'Subject',
      PLACEHOLDER: 'Property Inquiry',
      ERROR: {
        MIN_LENGTH: "Subject must be at least 5 characters",
      },
    },
    MESSAGE: {
      FIELD_NAME: 'message',
      LABEL: 'Message',
      PLACEHOLDER: 'I\'m interested in scheduling a viewing for this property',
      ERROR: {
        MIN_LENGTH: "Message must be at least 10 characters",
      },
    },
    SUBMIT: 'Send Message',
  },
};
