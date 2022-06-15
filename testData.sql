INSERT INTO ranger VALUES (1,'Harry Redman', 'username', 'password');


INSERT INTO station VALUES (100,'-19.554757', '140.237481', 'Four Ways', true);
INSERT INTO station VALUES (101, '-20.635857', '141.771922', 'Julia Creek', true);
INSERT INTO station VALUES (102,'-19.966106', '138.419158', 'Barkly', true);

INSERT INTO station_check VALUES (54,56,'Very Good',100, 1,'2013-03-21');
INSERT INTO station_check VALUES (55,44,'Good',100, 1, '15/05/2022');
INSERT INTO station_check VALUES (56,23,'Good',100, 1, '10/04/2022');
INSERT INTO station_check VALUES (57,98,'Fair',100, 1, '15/06/2022');





DELETE FROM ranger where username = 'harry10';
DELETE FROM station where Information = 'Norwich';
DELETE FROM station_check where checkdate = '2021-09-21';