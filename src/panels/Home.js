import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge'; // Не забудь импортировать bridge для работы с VK API

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  const handleOpenStoryEditor = () => {
    const randomImageUrl = 'https://loremflickr.com/300/600?random=${Math.random()}';

    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: randomImageUrl,
    })
    .then((data) => {
      console.log('История успешно открыта:', data);
    })
    .catch((error) => {
      console.error('Ошибка открытия истории:', error);
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>

        <Div>
          {/* ХОУ ХОУ ХОУ!!! ПОСТ РАНДОМНОЙ ИСТОРИИ ЛОЛ */}
          <Button stretched size="l" mode="primary" onClick={handleOpenStoryEditor}>
            Открыть случайную фотографию в истории
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
