# select first_name, last_name, COUNT(title)
# from film
#          inner join film_actor fa on film.film_id = fa.film_id
#          inner join actor a on fa.actor_id = a.actor_id
# GROUP BY title
# ;

# select first_name,last_name,count(f.title) as number_films
# from actor
#     inner join film_actor fa on actor.actor_id = fa.actor_id
#     inner join film f on fa.film_id = f.film_id
# GROUP BY actor.actor_id, first_name, last_name
# ;

select first_name,last_name,count(fa.film_id) as number_films
from actor
inner join film_actor fa on actor.actor_id = fa.actor_id
group by fa.actor_id
;

