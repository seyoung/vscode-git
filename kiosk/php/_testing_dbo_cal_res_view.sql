
select *
from dbo.cal_res_view
where view_start_date BETWEEN '2018-10-31 00:30:00.000' and '2018-10-31 23:30:00' ORDER BY view_start_date asc
--where view_start_date BETWEEN convert(datetime, '2018-10-30 오전 1:00') and convert(datetime, '2018-10-31 오후 12:00')
--declare @abc varchar(30)
--set @abc = '2004-01-07 오후 3:16:43'
--select case when charindex('오후',@abc) > 0 then dateadd(hh,12,convert(datetime, replace(@abc,'오후',''))) when charindex('오전',@abc) > 0 then convert(datetime, replace(@abc,'오전','')) else convert(datetime, @abc) end
