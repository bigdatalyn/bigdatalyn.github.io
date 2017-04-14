select department_id,sum(salary) from employees group by department_id; 
update employees set salary=salary+10 where department_id=20;
commit;
select department_id,sum(salary) from employees group by department_id; 
update employees set salary=salary+10 where department_id=60;
commit;
select department_id,sum(salary) from employees group by department_id;
