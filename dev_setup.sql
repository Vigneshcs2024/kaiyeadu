
INSERT INTO
  police_stations (id, name, area, district)
VALUES
  (
    'b3bdd993-51e3-4e80-aaa2-8b9b8d297b30',
    'Sample station',
    'Sample area',
    'Sample district'
  );
INSERT INTO
  users (
    id,
    name,
    email,
    phone,
    police_station,
    designation,
    role
  )
VALUES
  (
    '0ca1c4d5-72b9-4d05-991c-35dd02524796',
    'Admin',
    'admin@email.com',
    '9874563210',
    'b3bdd993-51e3-4e80-aaa2-8b9b8d297b30',
    'SI',
    'Master'
  )
  /* Reset the admin password before use */