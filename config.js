const {Pool} = require('pg');
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:
  ${process.env.PG_PASSWORD}@${process.env.PG_HOST}:
  ${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

  const proConfig = {
    connectionString:
    "postgres://fnsdyorbwhdtso:cbefb17817d7e2c9dfd94a53a75c3f387d0c6368faeda4ecb3462cdfcbf62d37@ec2-3-248-4-172.eu-west-1.compute.amazonaws.com:5432/d72gv4mq39al2q"
  }

  exports.pool = new Pool({
    connectionString:
    "postgres://fnsdyorbwhdtso:cbefb17817d7e2c9dfd94a53a75c3f387d0c6368faeda4ecb3462cdfcbf62d37@ec2-3-248-4-172.eu-west-1.compute.amazonaws.com:5432/d72gv4mq39al2q"
  });