let restaurants;

const RestaurantsDAO = () => {
  const injectDB = async conn => {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection('restaurants');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  };

  const getRestaurants = async ({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) => {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ('cuisine' in filters) {
        query = { cuisine: { $eq: filters[cuisine] } };
      } else if ('zipcode' in filters) {
        query = { 'adress.zipcode': { $eq: filters['zipcode'] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants =
        page === (await restaurants.countDocument(query));

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  };
};

export default RestaurantsDAO;
