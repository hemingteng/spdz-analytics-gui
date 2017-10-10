# SPDZ Analytics GUI
A GUI to run analytics queries against data from 2 independant databases, using SPDZ to securely compute a result.

## Dev environment example queries 

avg

```sql 
select sum(amount), count(amount)
  from v_cyberfraud
```    
```sql  
select sum(loss), count(loss)
 from v_cyberfraud
```

% histogram

```sql 
select hour(incidentDate), count(*)
  from v_cyberFraud 
 where year(incidentDate) = '2017'
 group by hour(incidentDate)
```
```sql 
select hour(lossDate), count(*)
  from v_cyberFraud 
 where year(incidentDate) = '2017'
 group by hour(lossDate)
```

% sum by lookup

```sql
select ipAddress, amount 
  from v_cyberfraud
```
```sql 
select ipAddress, attributionId 
  from v_attribution
```