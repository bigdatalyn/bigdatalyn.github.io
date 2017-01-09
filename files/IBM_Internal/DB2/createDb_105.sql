-- Licensed Materials - Property of IBM
--
-- BI and PM: CM
--
-- (C) Copyright IBM Corp. 2010
--
-- US Government Users Restricted Rights - Use, duplication or disclosure
-- restricted by GSA ADP Schedule Contract with IBM Corp.

-- Copyright (C) 2008 Cognos ULC, an IBM Company. All rights reserved.
-- Cognos (R) is a trademark of Cognos ULC, (formerly Cognos Incorporated).

-- Use this template to create the IBM Cognos content database. Replace these variables:  
-- CS : Database name
-- db2inst1 : User ID, this account is used by the product to connect to the content store
-- This script must be run as a user that has sufficient privileges to access and create the database. 
-- The database user account meeds to exist for the product to function.

CREATE DATABASE CS USING CODESET UTF-8 TERRITORY JP;
CHANGE DATABASE CS COMMENT WITH 'IBM Cognos Content Store';

!db2set DB2_INLIST_TO_NLJN=Y;

CONNECT TO CS;
UPDATE DATABASE CONFIGURATION USING APPLHEAPSZ AUTOMATIC;
UPDATE DATABASE CONFIGURATION USING LOCKTIMEOUT 240 DEFERRED; 
CONNECT RESET;

CONNECT TO CS;
CREATE BUFFERPOOL CS_08KBP IMMEDIATE SIZE 1000 AUTOMATIC PAGESIZE 8K;
CREATE BUFFERPOOL CS_32KBP IMMEDIATE SIZE 1000 AUTOMATIC PAGESIZE 32K;
CONNECT RESET;

CONNECT TO CS;
CREATE SYSTEM TEMPORARY TABLESPACE TSN_SYS_CS PAGESIZE 32K BUFFERPOOL CS_32KBP;
CREATE USER TEMPORARY TABLESPACE TSN_USR_CS PAGESIZE 8K BUFFERPOOL CS_08KBP;
CREATE REGULAR TABLESPACE TSN_REG_CS PAGESIZE 8K BUFFERPOOL CS_08KBP; 
CONNECT RESET;
