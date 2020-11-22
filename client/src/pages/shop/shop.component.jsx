import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.action';

import CollectionOverviewContainer from '../../components/collections-overview/CollectionOverviewContainer';
import CollectionPageContainer from '../collection/CollectionPageContainer';

function ShopPage({ match, fetchCollectionsStart }) {
  // fetch(`https://firestore.googleapis.com/v1/projects/crwn-db-9eca7/databases/(default)/documents/collections
  // `)
  //   .then((res) => res.json())
  //   .then((collections) => console.log(collections));

  //observe pattern
  //listen to firestore's data change, once changed, send back a collection snapshot
  //then we send it to reducer, change view
  // const unsubscribeCollection = collectionsRef.onSnapshot(
  //   //send snapshot first time and every time firestore data changed
  //   async (snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     //data has been stored in the reducer
  //     setLoading(false);
  //   }
  // );

  useEffect(() => {
    //we do not need an Async action anymore

    fetchCollectionsStart();
  }, []);

  return (
    <div className="shop-page">
      <h1>SHop Page</h1>
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => <CollectionOverviewContainer />}
        />

        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(routeProps) => <CollectionPageContainer {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
