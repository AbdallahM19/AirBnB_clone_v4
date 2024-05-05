#!/usr/bin/python3
"""Script to start a Flask web application"""

from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def teardown_db(exception):
    """Close the current SQLAlchemy Session"""
    storage.close()


@app.route('/101-hbnb', strict_slashes=False)
def hbnb():
    """Display a HTML page like 100-hbnb.html"""
    amenities = storage.all('Amenity').values()
    states_args = storage.all('State').values()
    states = dict([i.name, i] for i in states_args)
    cities = storage.all('City').values()
    places = storage.all('Place').values()
    users_args = storage.all('User').values()
    users = dict(
        [x.id, "{} {}".format(x.first_name, x.last_name)]
        for x in users_args
    )
    return render_template(
        '101-hbnb.html',
        states=states,
        cities=cities,
        amenities=amenities,
        places=places,
        users=users,
        cache_id=uuid.uuid4()
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
