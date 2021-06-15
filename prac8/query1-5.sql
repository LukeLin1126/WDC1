select sum(length) as 'total number of minutes'
from film
where film_id IN (
    select film_id
    from film_actor
    where film_actor.actor_id = (
        select actor.actor_id
        from actor
        where first_name = 'ANGELA'
          And last_name = 'WITHERSPOON'
    )
)
;


# select SUM(length)
# from film
#          inner join film_actor fa on film.film_id = fa.film_id
#          inner join actor a on fa.actor_id = a.actor_id
# where CONCAT(a.first_name,' ',a.last_name) = 'ANGELA WITHERSPOON'
# ;



