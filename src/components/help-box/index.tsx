import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Link,
  ListItem,
  Text,
  OrderedList,
  UnorderedList,
  useTheme,
} from '@chakra-ui/react';
import { useSession, useAuthorizationApi, RoqResourceEnum, AccessOperationEnum, AccessServiceEnum } from '@roq/nextjs';
import React, { useEffect, useMemo, useState } from 'react';
import { FiX, FiHelpCircle } from 'react-icons/fi';
import Joyride, { ACTIONS, CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride';
import { appConfig } from 'config';
import { LightBulbIcon } from 'icons/light-bulb-icon';

interface State {
  run: boolean;
  steps: Step[];
}

function Tooltip(props: TooltipRenderProps) {
  const { backProps, continuous, index, isLastStep, primaryProps, skipProps, step, tooltipProps, closeProps } = props;
  return (
    <Box maxW={{ base: '350px', md: 'md' }} minW={{ base: '270px', md: 'unset' }} {...tooltipProps}>
      <Card align="center" bg="neutral.main">
        <CardHeader w="100%" pb={2} pt={4}>
          <Flex alignItems={'center'} justifyContent="space-between">
            <Heading size="md" color="neutral.content" fontSize={'1.125rem'} fontWeight={600}>
              {step.title}
            </Heading>
            <IconButton
              {...closeProps}
              icon={<FiX size="1.5em" />}
              bg="neutral.main"
              color="neutral.content"
              _hover={{
                bg: 'neutral.content',
                color: 'neutral.main',
              }}
            />
          </Flex>
        </CardHeader>
        <CardBody color="neutral.content" pt={0} fontSize={'0.875rem'}>
          {step.content}
        </CardBody>
        <CardFooter w="100%">
          <Flex w="100%" justify={'space-between'}>
            <Button
              {...backProps}
              width="3.5rem"
              height="2rem"
              border="1px"
              borderColor="neutral.content"
              bg="neutral.main"
              borderRadius={'6px'}
              fontWeight={600}
              fontSize={'0.875rem'}
              color="neutral.content"
              _hover={{
                bg: 'neutral.content',
                color: 'neutral.main',
              }}
              alignSelf="flex-end"
            >
              {index === 0 ? 'Exit' : 'Back'}
            </Button>
            <Button
              {...primaryProps}
              width="3.5rem"
              height="2rem"
              border="1px"
              borderColor="neutral.content"
              borderRadius={'6px'}
              bg="neutral.content"
              color="neutral.focus"
              fontSize={'0.875rem'}
              fontWeight={600}
              _hover={{
                bg: 'neutral.content',
                color: 'neutral.main',
              }}
              alignSelf="flex-end"
            >
              {isLastStep ? 'Done' : 'Next'}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
}

function isFirstLogin() {
  const firstTimeLogin = !localStorage.getItem('userHasLoggedIn');
  if (firstTimeLogin) {
    localStorage.setItem('userHasLoggedIn', 'true');
    return false;
  } else {
    return true;
  }
}

function isFirstVisit() {
  const firstTimeLogin = !localStorage.getItem('userFirstVisit');
  if (firstTimeLogin) {
    localStorage.setItem('userFirstVisit', 'true');
    return false;
  } else {
    return true;
  }
}

export const HelpBox: React.FC = () => {
  // start help-box-variables
  const { ownerRoles, customerRoles, tenantRoles, applicationName, tenantName, addOns } = appConfig;

  const { hasAccess } = useAuthorizationApi();
  // end help-box-variables
  const theme = useTheme();
  const { session, status: sessionStatus } = useSession();
  const defaultStepStyles = {
    styles: {
      spotlight: {
        border: '2px solid var(--chakra-colors-neutral-focus)',
        borderRadius: '8px',
      },
    },
    offset: 55,
  };
  const steps = useMemo<Step[]>(
    () =>
      !Boolean(session?.roqUserId)
        ? [
            {
              title: <Text>{`🎉 Welcome Aboard ${applicationName}, Your New App Adventure!`}</Text>,
              content: (
                <Box>
                  <Text mb="4">
                    We briefly guide you through your app and how it can help you building your next project
                  </Text>
                  <OrderedList mb="4">
                    <ListItem>You received access to the codebase via email and Github invitation.</ListItem>
                    <ListItem>
                      Questions? In our{' '}
                      <Link
                        href="https://join.slack.com/t/roq-community/shared_invite/zt-1ly20yqpg-K03kNGxN1C7G1C0rr3TlSQ"
                        isExternal
                        textDecoration={'underline'}
                      >
                        Community Slack
                      </Link>{' '}
                      you can talk to our team and other users.
                    </ListItem>
                    <ListItem>You can revisit this guide by clicking the icon on the bottom left.</ListItem>
                  </OrderedList>
                  <Text>Let’s start!</Text>
                  <Text>P.S: To disable this tutorial, just set the NEXT_PUBLIC_SHOW_BRIEFING env variable.</Text>
                </Box>
              ),
              placement: 'center',
              target: 'body',
              ...defaultStepStyles,
              disableBeacon: true,
            },
            {
              title: <Text>{`Let’s get started!`}</Text>,
              content: (
                <Box>
                  <Text mb="2">{`You've crafted a multi-tenancy application with two unique customer types:`}</Text>
                  {customerRoles.length > 0 && (
                    <Box mb="2">
                      <Text>{`🏠 Owner`}</Text>
                      <Text>{`👥 Customer`}</Text>
                    </Box>
                  )}
                  <Text>{`👉 Let's go: Please create an account to continue this guide within your app. Can't wait to see you there!`}</Text>
                </Box>
              ),
              target: '.roles-container',
              placement: 'right-end',
              ...defaultStepStyles,
            },
          ]
        : ([
            {
              title: <Text>{`Voilà, Your Personal Data Model!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text mb="2">{`Based on your inputs, we've build your individual data model. You find the main entities at the top of the menu.`}</Text>
                  <Text mb="2">Two highlights:</Text>
                  <OrderedList>
                    <ListItem>{`You have data tables and CRUD functionality on the subpages.`}</ListItem>
                    <ListItem>
                      {`Underneath the hood you have a `}{' '}
                      <Text as="span" fontWeight="bold">
                        powerful access managment
                      </Text>{' '}
                      {` – every user can only see the entries that match the user’s individual role and organization!`}
                    </ListItem>
                  </OrderedList>
                </Box>
              ),
              target: '.main-nav',
              disableBeacon: true,
              ...defaultStepStyles,
            },
            {
              title: <Text>{`🎟️ Your User Invite Gateway!`}</Text>,
              content: (
                <Box>
                  <Text mb="2">{`This is your streamlined interface for inviting users to your product! It's engineered for effortless and effective user onboarding right from the beginning.`}</Text>
                </Box>
              ),
              placement: 'right-end',
              target: '.nav-userInvite',
              ...defaultStepStyles,
            },
            {
              title: <Text>{`👤 Meet Your User Profile!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text mb="2">{`On the top right, you'll find the user profile functionality.`}</Text>
                  <Text>{`Here, both you and your users can manage their information, upload avatars, and much more. See how everything is working right from the start!`}</Text>
                </Box>
              ),
              target: '.layout-user-profile',
              ...defaultStepStyles,
            },
            addOns.includes('notifications') && {
              title: <Text>{`🔔 Ring-a-ding, your notification center!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text
                    mb={'2'}
                  >{`Here lies your ready-to-go notification feature. It's set up for in-app alerts right out of the box!`}</Text>
                  <Text>{`Feel free to add new notification types and channels (like SMS, Emails, ..) or even more in-app alerts. In the our documentation you find more details on how this works.`}</Text>
                </Box>
              ),
              target: '.layout-notification-bell',
              ...defaultStepStyles,
            },
            hasAccess(RoqResourceEnum.CONVERSATION, AccessOperationEnum.READ, AccessServiceEnum.PLATFORM) &&
              addOns.includes('chat') && {
                title: <Text>{`💬 Seamless Connections, your chat feature unveiled!`}</Text>,
                content: (
                  <Box>
                    <Text mb="2">{`This is your robust tool for facilitating direct and interactive communication within your product! Designed for smooth conversations from the start, it enables you to incorporate real-time messaging, create group discussions, share files, and more`}</Text>
                  </Box>
                ),
                placement: 'right-end',
                target: '.nav-conversation',
                ...defaultStepStyles,
              },
          ].filter(Boolean) as Step[]),
    [session?.roqUserId],
  );

  const [run, setRun] = useState(false);
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }

    // User pressed back on the first step
    if ((status === STATUS.RUNNING || status === STATUS.READY) && action === ACTIONS.PREV && index === 0) {
      setRun(false); // This will close the Joyride
    }
  };

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setRun(true);
  };

  useEffect(() => {
    if (session?.roqUserId) {
      if (!isFirstLogin()) {
        setRun(true);
      }
    } else {
      if (!isFirstVisit()) {
        setRun(true);
      }
    }
  }, [session?.roqUserId]);

  if (
    !process.env.NEXT_PUBLIC_SHOW_BRIEFING ||
    process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false' ||
    sessionStatus === 'loading'
  ) {
    return null;
  }

  return (
    <Box width={1} position="fixed" right="64px" bottom="20px" zIndex={3}>
      <IconButton
        onClick={handleClickStart}
        aria-label="Help Info"
        icon={
          <LightBulbIcon
            bg="var(--chakra-colors-neutral-main)"
            color="var(--chakra-colors-neutral-main)"
            width="24px"
            height="24px"
          />
        }
        bg="neutral.main"
        color="neutral.main"
        _hover={{ bg: 'neutral.main' }}
        _active={{ bg: 'neutral.main' }}
        _focus={{ bg: 'neutral.main' }}
      />
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        steps={steps}
        tooltipComponent={Tooltip}
        disableScrolling={true}
        spotlightPadding={2}
        floaterProps={{
          hideArrow: true,
        }}
        styles={{
          options: {
            zIndex: 10000,
            overlayColor: 'rgba(0, 0, 0, 0.20)',
          },
        }}
      />
    </Box>
  );
};
