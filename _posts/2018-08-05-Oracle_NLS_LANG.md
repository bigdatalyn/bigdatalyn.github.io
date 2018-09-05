---
layout: post
title: "Oracle Setting the NLS_LANG Environment Tips"
category: Oracle
tags: Oracle ADWC
---

* content
{:toc}



Oracle Setting the NLS_LANG Environment Tips
	

Follow this procedure to set the NLS_LANG environment variable for Oracle databases.

To set the NLS_LANG environment variable for Oracle databases

    Determine the NLS_LANG value.
        In the data warehouse database, run the command 

    SELECT * FROM V$NLS_PARAMETERS
        Make a note of the NLS_LANG value, which is in the format [NLS_LANGUAGE]_[NLS_TERRITORY].[NLS_CHARACTERSET].

        For example: American_America.UTF8
    For Windows:
        Navigate to Control Panel > System and click the Advanced tab. Click Environment Variables.
        In System variables section, click New.
        In the Variable Name field, enter NLS_LANG.
        In the Variable Value field, enter the NLS_LANG value that was returned in Step 1.

        The format for the NLS_LANG value should be [NLS_LANGUAGE]_[NLS_TERRITORY].[NLS_CHARACTERSET].

        For example: American_America.UTF8.
    For UNIX, set the variable as shown below:

    setenv NLS_LANG <NLS_LANG>

For example: setenv NLS_LANG American_America.UTF8.

If your data is 7-bit or 8-bit ASCII and the Informatica Server is running on UNIX, then set

	NLS_LANG <NLS_LANGUAGE>_<NLS_TERRITORY>.WE8ISO8859P1

	CAUTION:  Make sure you set the NLS_LANG variable correctly, as stated in this procedure, or your data will not display correctly.
	Reboot the machine after creating the variable. 	
	
Other Tips:

Execute the following sql and export.

	select DECODE(parameter, 'NLS_CHARACTERSET', 'CHARACTER SET',
	'NLS_LANGUAGE', 'LANGUAGE',
	'NLS_TERRITORY', 'TERRITORY') name,
	value from v$nls_parameters
	WHERE parameter IN ( 'NLS_CHARACTERSET', 'NLS_LANGUAGE', 'NLS_TERRITORY')
	/

Use the result and export the following command.

	export NLS_LANG=<language>_<territory>.<character set>
	
To be continue....

Have a good life! 2018/08 via LinHong


