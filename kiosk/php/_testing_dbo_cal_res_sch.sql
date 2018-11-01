select *
from dbo.cal_res_sch
--where resource_seq LIKE '1' and sdate BETWEEN '2018-10-31 01:00' and '2018-10-31 23:00'
--where resource_seq = 1 and schedule_seq = 7122

--where resource_seq LIKE '1'
--and sdate BETWEEN '2018-10-31 01:00' and '2018-10-31 23:00'

--SELECT * FROM dbo.cal_res_sch WHERE resource_seq LIKE '1' and sdate BETWEEN '2015-01-01' and '2015-03-01'

--and REPLACE(T1.AW_WORK_DATE,'.','') BETWEEN REPLACE(@A_FROM_DATE,'.','') + '000000' and REPLACE(@A_TO_DATE,'.','') + '240000'