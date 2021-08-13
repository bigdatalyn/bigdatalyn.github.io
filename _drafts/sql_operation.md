
1 Access Path
•	Full Table Scan
•	Rowid Scan
•	Index Scan (Unique)
•	Index Scan (Range)
•	Index Scan (Full)
•	Index Scan (Fast Full)
•	Index Skip (Scan)
•	Index Scan (Index Join)
•	Using Bitmap Indexes
•	Combining Bitmap Indexes
2 Other Unary Operations
•	Sort – Hash
•	Buffer Sort 
•	InList Iterator
•	View
•	Count Stop Key
•	First Row / (Min/Max)
3 Join Tables
•	Nested Loops 
•	Sort Merge
•	Hash Join
•	Cartesian Product
•	Join Types (Anti - Semi - Star)
4 Other N-ary Operations
•	Filter
•	Concatenation
•	Connect by 
•	Union all / Intersect / Minus





1.1	Full Table Scan
1.1.1.multi-block reads: db_file_multiblock_read_count(128)
1.1.2.read all blocks below HWM(high water mark)
- During a full table scan, all blocks in the table that are under the high-water mark are scanned (even if all rows have been deleted from table). 
1.1.3.filters rows

1.2 Rowid Scan

To access a table by rowID, Oracle first obtains the rowIDs of the selected rows, either from the statement’s WHERE clause or through an index scan of one or more. Oracle then locates each selected row in the table based on its rowID. 

Note: Due to row migration, a rowID can sometimes point to a different address than the actual row location, resulting in more than one block being read to locate a row. By example, an update to a row causes the row to be placed in another block with a pointer in the original block. The rowID, however, will still have only the address of the original block.


using DBMS_ROWID.ROWID_INFO

ROWID:   OOOOOOFFFBBBBBBSSS
         ------
           |   ---
           |    | ------
           |    |   |   ------
           |    |   |     |____________> Slot (Row) Number
           |    |   |__________________> Block Number
           |    |______________________> Relative File Number
           |___________________________> Data Object Number











