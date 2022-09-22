drop database meetyour;

use meetyourdoctor;
show tables;

--  Creating trigger for login table
drop table login_audit;
create table login_audit(
id int auto_increment primary key,
email varchar(40) not null,
password varchar(300) not null,
action varchar(50) default null,
ip_addrs varchar(30) default null,
change_date datetime default null
);

-- Create Trigger  
create trigger login_update
before update on login
for each row
insert into login_audit
set action='update',
email = old.email,
password = old.password,
change_date = now();

insert into roles values(default, "ROLE_ADMIN");
insert into roles values(default, "ROLE_PATIENT");
insert into roles values(default, "ROLE_DOCTOR");

select * from roles;
select * from login;
select * from user_roles;

select * from doctor_addresses;
select * from doctors;
select * from doctor_hobbies;
select * from bank_accounts;
select * from doctor_qualifications;
select * from doctor_speciality;
select * from doctor_timetable;

select * from patients;
select * from patient_addresses;
select * from patient_hobbies;


select * from appointments;
select * from appointment_images;
select * from payments;

select * from login_audit;
select * from public;
select * from home_page_images;



desc home_page_images;
desc addresses;
desc appointments;
desc doctors;
desc patients;
desc login;
desc doctor_hobbies;
desc patient_hobbies;
desc doctor_qualifications;
desc doctor_speciality;
desc doctor_timetable;
desc payments;
desc user_roles;
desc roles;
desc bank_accounts;
truncate patients;
truncate patient_hobbies;
truncate login;

