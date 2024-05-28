import { Container, VStack, Box, Heading, Text, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost } from '../integrations/supabase/api';

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      addPostMutation.mutate({ title: newPost.title, body: newPost.content });
      setNewPost({ title: "", content: "" });
    }
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Box as="nav" bg="blue.500" color="white" p={4} mb={6}>
        <Heading size="lg">Public Post Board</Heading>
      </Box>

      <VStack spacing={6} align="stretch">
        <Box as="main" flex="1">
          <Heading size="md" mb={4}>Posts</Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error loading posts.</Text>
          ) : posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post) => (
              <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading size="sm">{post.title}</Heading>
                <Text mt={2}>{post.body}</Text>
              </Box>
            ))
          )}
        </Box>

        <Box as="form" onSubmit={handleSubmit} p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>New Post</Heading>
          <Input
            placeholder="Title"
            mb={3}
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <Textarea
            placeholder="Content"
            mb={3}
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
          <Button type="submit" colorScheme="blue" isLoading={addPostMutation.isLoading}>Submit</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;