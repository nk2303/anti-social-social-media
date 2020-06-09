import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from '../components/shared/Layout'
import UserCard from '../components/shared/UserCard'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
// import FeedPost from '../components/feed/FeedPost'
import { getDefaultPost } from '../data'
import { Hidden } from "@material-ui/core";
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
// lazy loading => performance boost (need to be at the bottom)
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'))

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed] = React.useState(false)

  let loading = false
  if (loading) return <LoadingScreen />

  return <Layout>
    <div className={classes.container}>
      {/* feed post  */}
      <div>
        {Array.from({ length: 5 }, () => getDefaultPost()).map((post, index) => (
          <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
            <FeedPost index={index} post={post} />
          </React.Suspense>
        ))}
      </div>
      {/* side bar */}
      <Hidden smDown>
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarWrapper}>
            <UserCard avatarSize={50} />
            <FeedSideSuggestions />
          </div>
        </div>
      </Hidden>
      {!isEndOfFeed && <LoadingLargeIcon />}
    </div>
  </Layout>;
}

export default FeedPage;
