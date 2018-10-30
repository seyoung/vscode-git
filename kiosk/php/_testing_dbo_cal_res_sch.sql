select *
from dbo.cal_res_sch
where resource_seq LIKE '1'
and sdate BETWEEN '2015-01-01' and '2015-01-20'



--and REPLACE(T1.AW_WORK_DATE,'.','') BETWEEN REPLACE(@A_FROM_DATE,'.','') + '000000' and REPLACE(@A_TO_DATE,'.','') + '240000'