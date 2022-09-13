<script lang="ts">
  import { Group, Space } from '@svelteuidev/core';
  import { EnvelopeClosed, LinkedinLogo, GithubLogo, Home, Video } from 'radix-icons-svelte';
</script>

<footer>
  <Group spacing="xl" position="center" grow noWrap>
    <a
      href="https://github.com/psycho-baller/self-driving-car"
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <GithubLogo title="github" aria-label="github"/>
    </a>
    <Space   />
    <Space   />
    <a
      href="https://www.linkedin.com/in/rami--maalouf/"
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <LinkedinLogo color="blue" />
    </a>
    <Space   />
    <Space   />
    <a href="https://rami-maalouf.vercel.app/" target={'_blank'} rel={'noopener noreferrer'}>
      <Home title="personal website" aria-label="personal website"/>
    </a>
    <Space   />
    <Space   />
    <a href="mailto:rami.rami@ucalgary.ca" target={'_blank'} rel={'noopener noreferrer'}>
      <EnvelopeClosed color="blue" title="email" aria-label="email" />
    </a>
    <Space   />
    <Space   />
    <a
      href="https://www.youtube.com/channel/UCf9CoIzXxFcwlwaNuN5_1BQ"
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <Video color="red" title="youtube" aria-label="youtube"/>
    </a>
  </Group>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 1rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
</style>
