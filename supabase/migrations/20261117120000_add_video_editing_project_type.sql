/*
  # Add 'Video Editing' to the allowed project types

  The site now offers Video Editing as a fifth service, so the booking and
  enquiry forms can submit it. Existing rows are untouched.
*/

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_project_type_valid;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_project_type_valid CHECK (
    project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Video Editing','Other')
  );

ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_project_type_valid;
ALTER TABLE inquiries
  ADD CONSTRAINT inquiries_project_type_valid CHECK (
    project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Video Editing','Other')
  );
