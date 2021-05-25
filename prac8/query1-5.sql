select sum(length)
from film
where film_id IN (
    select film_id
    from film_actor
    where film_actor.actor_id = (
        select actor_id
        from actor
        where CONCAT(first_name, ' ', last_name) = 'ANGELA WITHERSPOON'
    ) and film_id <= 500
);


# select SUM(length)
# from film
#          inner join film_actor fa on film.film_id = fa.film_id
#          inner join actor a on fa.actor_id = a.actor_id
# where CONCAT(a.first_name,' ',a.last_name) = 'ANGELA WITHERSPOON'
# ;



