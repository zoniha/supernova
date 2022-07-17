import { Box, Grid, Image, Text, UnorderedList, ListItem, Link, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';

const links = [
  { href: 'https://zenn.dev/astrologian', content: 'Zenn' },
  { href: 'https://github.com/zoniha', content: 'GitHub' },
  { href: 'https://www.resume.id/zoniha', content: 'Resume' },
] as const;

const description = {
  para1: `現在はSESエンジニアとして働いています。`,
  para2: `将来的には、ユーザーからの意見も取り入れながらプロダクトを成長させていけるような環境で働き、
    エンジニア視点だけでなくユーザー視点からもプロダクト開発が行えるフロントエンドエンジニアのスペシャリストになりたいと考えています。`,
} as const;

const About: NextPage = () => {
  return (
    <Box mx={'auto'} px={'24px'} mt={'80px'}>
      <Grid w={'full'} justifyItems={'center'} alignItems={'center'} gap={'24px'}>
        <Image
          src={'avatar.png'}
          boxSize={192}
          border={'4px'}
          borderColor={'yellow.300'}
          borderRadius={'full'}
          alt={`zoniha's avatar`}
        />
        <Text fontSize={'3xl'}>zoniha</Text>
        <UnorderedList display={'flex'} flexWrap={'wrap'} listStyleType={'none'}>
          {links.map(({ href, content }) => {
            return (
              <ListItem key={content} ml={'4px'}>
                <NextLink href={href} target={'_blank'}>
                  <Link textDecor={'underline'} _hover={{ opacity: '0.75' }}>
                    {content}
                  </Link>
                </NextLink>
                <Box
                  as="span"
                  ml={1}
                  transform={'rotate(-45deg)'}
                  display={'inline-block'}
                  cursor={'default'}
                >
                  →
                </Box>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Grid>
      <Flex
        w={'full'}
        mt={'56px'}
        lineHeight={'26px'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box maxW={'1000px'} textAlign={'center'}>
          <Text>{description.para1}</Text>
          <Text mt={'28px'}>{description.para2}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default About;