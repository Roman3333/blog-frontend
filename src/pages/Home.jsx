import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Box } from '@mui/material/';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  //Tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            style={{ marginBottom: 15 }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Новые" {...a11yProps(0)} />
            <Tab label="Популярные" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl ? `http://localhost:3333${obj.imageUrl}` : ''}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                    key={obj._id}
                  />
                ),
              )}
            </Grid>
            <Grid xs={4} item>
              <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: 'Вася Пупкин',
                      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    },
                    text: 'Это тестовый комментарий',
                  },
                  {
                    user: {
                      fullName: 'Иван Иванов',
                      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                    },
                    text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {isPostsLoading ? (
                <div>Идет загрузка</div>
              ) : (
                posts.items
                  .map((a) => a)
                  .map((obj, index) => (
                    <Post
                      id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? `http://localhost:3333${obj.imageUrl}` : ''}
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={2}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user._id}
                      key={obj._id}
                    />
                  ))
              )}
            </Grid>
            <Grid xs={4} item>
              <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: 'Вася Пупкин',
                      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    },
                    text: 'Это тестовый комментарий',
                  },
                  {
                    user: {
                      fullName: 'Иван Иванов',
                      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                    },
                    text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};
