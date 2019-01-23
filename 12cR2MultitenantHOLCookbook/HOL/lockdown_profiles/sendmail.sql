CREATE OR REPLACE PROCEDURE SEND_MAIL (
  msg_to varchar2, 
  msg_subject varchar2,
  msg_text varchar2 )
IS
c utl_smtp.connection;
rc integer; 
msg_from varchar2(50) := 'Oracle12.2'; 
mailhost VARCHAR2(30) := 'mail.oracle.com'; -- local database host 

BEGIN
  c := utl_smtp.open_connection(mailhost, 25); -- SMTP on port 25 
  utl_smtp.helo(c, mailhost);
  utl_smtp.mail(c, msg_from);
  utl_smtp.rcpt(c, msg_to);

  utl_smtp.data(c,'From: Oracle Database' || utl_tcp.crlf ||
                'To: ' || msg_to || utl_tcp.crlf ||
                'Subject: ' || msg_subject || 
                utl_tcp.crlf || msg_text);
                utl_smtp.quit(c);

EXCEPTION
  WHEN UTL_SMTP.INVALID_OPERATION THEN
    dbms_output.put_line(' Invalid Operation in Mail attempt 
                         using UTL_SMTP.');
  WHEN UTL_SMTP.TRANSIENT_ERROR THEN
    dbms_output.put_line(' Temporary e-mail issue - try again'); 
  WHEN UTL_SMTP.PERMANENT_ERROR THEN
    dbms_output.put_line(' Permanent Error Encountered.'); 
END;
/