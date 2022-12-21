---
layout: post
title: "Oracle 23c New features - Data Quality Operators in Oracle Database
 Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Data Quality Operators in Oracle Database
 Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Oracle Database 23c introduces the following two new string matching operators based on approximate or "fuzzy" string matching.

- `PHONIC_ENCODE` converts words or phrases into language-specific codes based on pronunciation.
- `FUZZY_MATCH`, which is language-neutral, gauges the textual similarity between two strings.

The new phonic encoding and fuzzy matching methods enable more sophisticated matching algorithms to be run directly on data in the database rather than only in external applications, providing improved matching performance and efficiency, for example in data de-duplication, linking or enhancement









### Fuzzy String Matching

Oracle Database 23c introduces two new operators for fuzzy string matching. PHONIC_ENCODE converts words or phrases in language-specific codes based on pronunciation. FUZZY_MATCH, which is language-neutral, gauges the textual similarity between two strings. By default, the resulting fuzzy match score is usually normalized to be a percentage of the lengths of the strings being compared.

These flexible and intelligent operators can often find valid matches in spite of typographical errors, spelling/phonetic variations, alternative names, initials in place of complete names, and other irregularities that preclude discovery via methods that use exact string matching or regular expressions. Because these operations can be run directly on the database, runtime is much more efficient than in EDO operations where the data must first be moved outside the database for processing.

[Data Quality Operators](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/sqlrf/data-quality-operators.html#GUID-30540D17-AC84-45F5-A511-75D95F7B0229)

- PHONIC_ENCODE
```
This operator mainly implements the Double Metaphone algorithm. If the keyword DOUBLE_METAPHONE is specified, it returns the main code. If DOUBLE_METAPHONE_ALT is specified, it returns the alternative code.
```
- FUZZY_MATCH
```
This operator supports the following keywords, each representing the corresponding supported algorithm: LEVENSHTEIN, JARO_WINKLER, BIGRAM and TRIGRAM, WHOLE_WORD_MATCH, and LONGEST_COMMON_SUBSTRING.
```
Test in 23c.
```
HONG@pdb1> select phonic_encode(DOUBLE_METAPHONE, 'smith') c1, phonic_encode(DOUBLE_METAPHONE_ALT, 'smith') c2 from dual;

C1			  C2
------------------------- -------------------------
SM0			  XMT

HONG@pdb1> select fuzzy_match(LEVENSHTEIN, 'Mohamed Tarik', 'Mo Tariq') from dual;

FUZZY_MATCH(LEVENSHTEIN,'MOHAMEDTARIK','MOTARIQ')
-------------------------------------------------
					       54

HONG@pdb1> 
```

### Reference 

[21.6 Real-Time SQL Monitoring Across Multiple PDBs](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/tgsql/monitoring-database-operations.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


