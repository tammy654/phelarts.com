/*
  # Bound and validate public form submissions server-side

  Validation previously existed only in browser code, so a direct API call
  could store unbounded text and non-email addresses. These constraints
  re-check length and email shape at the database, with limits well above
  what the real forms produce.
*/

ALTER TABLE bookings
  ADD CONSTRAINT bookings_name_len CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT bookings_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320),
  ADD CONSTRAINT bookings_company_len CHECK (company IS NULL OR char_length(company) <= 200),
  ADD CONSTRAINT bookings_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT bookings_project_type_len CHECK (project_type IS NULL OR char_length(project_type) <= 100),
  ADD CONSTRAINT bookings_budget_len CHECK (budget IS NULL OR char_length(budget) <= 100),
  ADD CONSTRAINT bookings_message_len CHECK (char_length(message) BETWEEN 1 AND 5000),
  ADD CONSTRAINT bookings_selected_date_len CHECK (selected_date IS NULL OR char_length(selected_date) <= 60),
  ADD CONSTRAINT bookings_selected_time_len CHECK (selected_time IS NULL OR char_length(selected_time) <= 60),
  ADD CONSTRAINT bookings_call_type_valid CHECK (call_type IS NULL OR call_type IN ('video', 'phone', 'chat'));

ALTER TABLE contacts
  ADD CONSTRAINT contacts_name_len CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT contacts_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320),
  ADD CONSTRAINT contacts_company_len CHECK (company IS NULL OR char_length(company) <= 200),
  ADD CONSTRAINT contacts_subject_len CHECK (subject IS NULL OR char_length(subject) <= 200),
  ADD CONSTRAINT contacts_project_type_len CHECK (project_type IS NULL OR char_length(project_type) <= 100),
  ADD CONSTRAINT contacts_budget_len CHECK (budget IS NULL OR char_length(budget) <= 100),
  ADD CONSTRAINT contacts_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);

ALTER TABLE newsletter
  ADD CONSTRAINT newsletter_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320);
