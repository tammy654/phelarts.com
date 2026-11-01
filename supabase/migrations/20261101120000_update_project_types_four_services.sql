/*
  # Update allowed project types to the four Phel Arts services

  The site now offers 2D Animation, Motion Graphics, Video Production and AI Videos.
  - Adds 'AI Videos' (form submissions with it were being rejected).
  - Drops the two retired service types; any existing rows using them move to 'Other'.
*/

UPDATE bookings SET project_type = 'Other'
  WHERE project_type IS NOT NULL
    AND project_type NOT IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Other');

UPDATE inquiries SET project_type = 'Other'
  WHERE project_type IS NOT NULL
    AND project_type NOT IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Other');

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_project_type_valid;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_project_type_valid CHECK (
    project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Other')
  );

ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_project_type_valid;
ALTER TABLE inquiries
  ADD CONSTRAINT inquiries_project_type_valid CHECK (
    project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Video Production','AI Videos','Other')
  );
