
drop table configurations;
drop table requests;
drop table apps;
drop table app_groups;

CREATE TABLE app_groups(
    group_no SERIAL PRIMARY KEY
    ,groupname TEXT
);

CREATE TABLE apps(
    app_no  SERIAL PRIMARY KEY
    ,app_id varchar(255)
    ,appname TEXT
    ,group_no SERIAL REFERENCES app_groups(group_no)
);

CREATE TABLE requests(
    req_no SERIAL
    ,app_no INTEGER REFERENCES apps(app_no)
);

CREATE TABLE configurations(
    conf_no SERIAL
    ,app_no INTEGER REFERENCES apps(app_no)
    ,jsonconf JSON
);

INSERT INTO app_groups values(1,'Dish設定');
INSERT INTO apps values(1,'wifi_config','Wi-Fi設定',1);