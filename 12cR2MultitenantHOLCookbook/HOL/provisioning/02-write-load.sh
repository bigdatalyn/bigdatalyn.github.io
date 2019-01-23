#!/bin/sh
#
. ./cdb1.env
#
echo ""
echo "  NOTE:"
echo "  To break out of this batch" 
echo "  job, please issue CTL-C "
echo ""
echo "...sleeping 5 seconds"
echo ""
sleep 5

  sqlplus -S /nolog << EOF
  @truncate_sale_orders.sql
EOF

c=1
while [ $c -le 1000 ]
do
  sqlplus -S /nolog  << EOF
  @batch-orders.sql
  commit;
  @count-sales.sql
  @scn.sql
  @dbname.sql
EOF
sleep 1
(( c++))
done
