import { createStackNavigator, createAppContainer } from 'react-navigation';
import CourseOutline from './CourseOutline';
import CourseContent from './CourseContent';
import QuizSettings from './QuizSettings';
import Quiz from './Quiz';
import Screens from '../utils/constants/screens';
import { ColorPalette } from '../utils/styles/colors';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      [Screens.Home]: {
        screen: CourseOutline,

        navigationOptions: () => ({
          title: 'Course contents'
        })
      },
      [Screens.CourseContent]: {
        screen: CourseContent
      },
      [Screens.QuizSettings]: {
        screen: QuizSettings,

        navigationOptions: ({ navigation }) => ({
          title: 'Quiz Settings'
        })
      },
      [Screens.Quiz]: {
        screen: Quiz,

        navigationOptions: ({ navigation }) => ({
          title: 'Quiz'
        })
      }
    },
    {
      initialRouteName: Screens.Home,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: ColorPalette.textOnPrimary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'normal'
        }
      }
    }
  )
);

export default AppNavigator;
