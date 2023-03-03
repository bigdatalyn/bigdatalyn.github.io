SELECT
    NULL
FROM
    obj$
WHERE
        owner# = :1
    AND type# != 10
UNION ALL
SELECT
    NULL
FROM
    link$
WHERE
    owner# = :1
UNION ALL
SELECT
    NULL
FROM
    streams$_capture_process
WHERE
    capture_userid = :1
UNION ALL
SELECT
    NULL
FROM
    streams$_apply_process
WHERE
    apply_userid = :1
UNION ALL
SELECT
    NULL
FROM
    wri$_sqlset_definitions s,
    user$                   u
WHERE
        s.owner = u.name
    AND u.user# = :1
UNION ALL
SELECT
    NULL
FROM
    wri$_adv_tasks
WHERE
    owner# = :1
UNION ALL
SELECT
    NULL
FROM
    xs$obj o,
    user$  u
WHERE
        o.owner = u.name
    AND u.user# = :1
UNION ALL
SELECT
    NULL
FROM
    xs$ace a,
    user$  u
WHERE
        a.prin# = u.user#
    AND u.type# = 1
    AND prin# = :1