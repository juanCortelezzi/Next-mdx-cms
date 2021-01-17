import Image from "next/image";
import { Link } from "../components/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nord from "./nordColorscheme";
import spliter from "../utils/spliter";
import createCode from "../utils/createCode";
import {
  Heading,
  Box,
  Code,
  Center,
  ListItem,
  OrderedList,
  List,
  UnorderedList,
  Container,
  Text,
  Divider,
  ListIcon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, MinusIcon } from "@chakra-ui/icons";

const margin = 4;
const marginTopHeader = 12;

export const renderers = () => ({
  heading: ({ level, node: { children } }) => {
    let value: any;
    switch (level) {
      case 1:
        value = (
          <Heading as="h2" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 2:
        value = (
          <Heading as="h3" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 3:
        value = (
          <Heading as="h4" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 4:
        value = (
          <Heading as="h5" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 5:
        value = (
          <Heading as="h6" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 6:
        value = (
          <Text fontSize="3xl" fontWeight="semibold" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Text>
        );
        break;
      default:
        value = <Text>{children[0].value}</Text>;
        break;
    }
    return value;
  },
  thematicBreak: () => <Divider my={margin} />,
  paragraph: ({ children }) => {
    return (
      <>
        {spliter(children).map((i: any) => {
          if (i.type === "P") {
            return (
              <Text fontSize="md" key={createCode()}>
                {i.children}
              </Text>
            );
          } else {
            return <Container key={createCode()}>{children}</Container>;
          }
        })}
      </>
    );
  },
  list: ({ ordered, children }) => {
    if (ordered) {
      return (
        <Center w="xs" py={margin}>
          <OrderedList>{children}</OrderedList>
        </Center>
      );
    } else if (children[0].props.node.checked !== null) {
      return (
        <Center w="xs" py={margin}>
          <List>{children}</List>
        </Center>
      );
    } else {
      return (
        <Center w="xs" py={margin}>
          <UnorderedList>{children}</UnorderedList>
        </Center>
      );
    }
  },
  listItem: ({ node: { checked }, children }) => {
    if (checked === null) {
      return <ListItem>{children}</ListItem>;
    } else {
      if (checked) {
        return (
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {children}
          </ListItem>
        );
      } else {
        return (
          <ListItem>
            <ListIcon as={MinusIcon} color="green.500" />
            {children}
          </ListItem>
        );
      }
    }
  },
  code: ({ language, value }) => (
    <Center my={margin}>
      <Box as="span" w="full" borderRadius="lg" overflow="hidden">
        <SyntaxHighlighter style={nord} language={language} children={value} />
      </Box>
    </Center>
  ),
  inlineCode: ({ value }) => <Code>{value}</Code>,
  strong: ({ children }) => (
    <Text as="b" fontSize="md" fontWeight="bold">
      {children}
    </Text>
  ),
  emphasis: ({ children }) => <Text as="i">{children}</Text>,
  imageReference: ({ src }) => {
    return (
      <Center my={margin}>
        <Box w={["xs", "md", "xl", "2xl"]} maxW="2xl" borderRadius="lg" overflow="hidden">
          <Image
            src={`https:${src}`}
            width={2000}
            height={1000}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Center>
    );
  },
  linkReference: ({ href, children }) => {
    return (
      <Link href={href} color="teal.500">
        {children[0].props.children}
      </Link>
    );
  },
  blockquote: ({ children }) => {
    return (
      <Center my={margin}>
        <Flex
          w="xs"
          justify="center"
          align="center"
          direction="column"
          borderWidth="1px"
          borderRadius="lg"
          p={margin}
        >
          <Flex w="full">
            <Text as="i" fontSize="3xl" fontWeight="bold" align="center">
              "
            </Text>
            <Spacer />
          </Flex>
          <Spacer />
          <Text as="i" fontSize="md" align="center" w={3 / 4}>
            {children}
          </Text>
          <Flex w="full">
            <Spacer />
            <Text as="i" fontSize="3xl" fontWeight="bold" align="center">
              "
            </Text>
          </Flex>
        </Flex>
      </Center>
    );
  },
});