'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { on } from 'events'
import Home from './Home'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'

interface Props {
    children: React.ReactNode
    onClick: () => void
}

const Links = ['Home', 'About', 'Projects', 'Contact']

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            onClick={props.onClick}
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentContent, setCurrentContent] = useState<String>('Home');

    const handleLinkClick = (link: String) => {
        console.log(link);
        setCurrentContent(link);
        onClose();
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link} onClick={() => handleLinkClick(link)}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={6}>
                            {Links.map((link) => (
                                <NavLink key={link} onClick={() => handleLinkClick(link)}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>
                {currentContent === 'Home' && <Home />}
                {currentContent === 'About' && <About />}
                {currentContent === 'Projects' && <Projects />}
                {currentContent === 'Contact' && <Contact />}
            </Box>
        </>
    )
}