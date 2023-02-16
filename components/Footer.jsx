import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Container from '@components/Container';

import axios from 'axios';

export const syntaxHighlight = (json) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({ email: '', message: '' });

  const handleSubmit = (e) => {
    setIsLoading(true);

    axios({
      url: 'https://formspree.io/f/mqkngagb',
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: form,
    })
      .then(() => {
        setErrors(null);
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setForm({ email: '', message: '' });

          setSentState(true);

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      })
      .catch(({ response }) => {
        setErrors(null);
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setSentState(true);
          setErrors(response.data.errors);

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      });

    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, message } = form;

  return (
    <div className="footer fixed bottom-0 -z-10 w-full  text-[#333] dark:text-white md:pt-36 md:pb-10">
      <pre
        className="text-xs absolute -top-1/2 -z-10 pointer-events-none select-none opacity-30"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight({
            id: '63ed59baa00062440f867a4d',
            index: 0,
            guid: '217ba6f1-fe1f-4545-88e9-4416cffa16db',
            isActive: false,
            balance: '$3,597.41',
            picture: 'http://placehold.it/32x32',
            age: 33,
            eyeColor: 'green',
            name: 'Kristie Frye',
            gender: 'female',
            company: 'ROUGHIES',
            address: '500 Bliss Terrace, Lisco, Arizona, 3870',
            about: 'Quis veniam culpa culpa in fugiat culpa consequat tempor nostrud aliqua',
            registered: '2014-08-07T06:00:56 +04:00',
            latitude: 71.520365,
            longitude: 40.292762,
            tags: ['reprehenderit', 'nostrud', 'minim', 'aliqua', 'sunt', 'qui', 'dolor'],
            friends: [
              {
                id: 0,
                name: 'Jeannine Sharpe',
              },
              {
                id: 1,
                name: 'Boone Valenzuela',
              },
              {
                id: 2,
                name: 'Mooney Sherman',
              },
            ],
            greeting: 'Hello, Kristie Frye! You have 1 unread messages.',
            favoriteFruit: 'strawberry',
          }),
        }}
      />
      <pre
        className="left-1/3 text-sm absolute bottom-0 -z-10 pointer-events-none select-none opacity-10"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight({
            registered: '2021-12-18T01:21:55 +05:00',
            latitude: 28.660751,
            longitude: -159.78149,
            tags: ['enim', 'fugiat', 'esse', 'ad', 'ullamco', 'Lorem', 'elit'],
            friends: [
              {
                id: 0,
                name: 'Paula Hensley',
              },
              {
                id: 1,
                name: 'Aisha Lester',
              },
              {
                id: 2,
                name: 'Lina Ware',
              },
            ],
            greeting: 'Hello, undefined! You have 8 unread messages.',
            favoriteFruit: 'strawberry',
          }),
        }}
      />
      <pre
        className="text-md right-0 absolute bottom-0 -z-10 pointer-events-none select-none opacity-20"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight({
            registered: '2020-01-15T03:34:19 +05:00',
            latitude: -11.968522,
            longitude: -6.819732,
            tags: ['mollit', 'reprehenderit', 'esse', 'dolor', 'proident', 'minim', 'nostrud'],
          }),
        }}
      />
      <Container>
        <h2 className="text-nowrap flex justify-center text-3xl font-black leading-[78px] md:text-[60px]">
          Contact
        </h2>
        <div>
          <form onSubmit={handleSubmit} className="grid gap-y-2 gap-x-5 py-4 sm:grid-cols-2">
            <label
              htmlFor="email"
              className="self-center font-graphik text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Email:
            </label>
            <div>
              <input
                type="email"
                name="email"
                required="required"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
                className="block w-full rounded-md border border-black/20 dark:border-white/10 bg-white dark:bg-[#424348] py-2 px-3 font-graphik text-sm font-medium text-white placeholder-gray-400 shadow-sm ring-offset-[#e9eaed] dark:ring-offset-[#2c2d30] transition duration-200 ease-in dark:focus:border-white/10 focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-3/4 sm:text-sm lg:w-1/2"
              />
            </div>
            <label
              htmlFor="message"
              className="mt-1 font-graphik text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Message:
            </label>
            <div>
              <textarea
                rows={3}
                required="required"
                name="message"
                className="block w-full rounded-md border border-black/20 dark:border-white/10 bg-white dark:bg-[#424348] py-2 px-3 font-graphik text-sm font-medium text-white placeholder-gray-400 shadow-sm ring-offset-[#e9eaed] dark:ring-offset-[#2c2d30] transition duration-200 ease-in dark:focus:border-white/10 focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-3/4 sm:text-sm lg:w-1/2"
                value={message}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
              />
            </div>
            <div />
            <div>
              <button
                type="submit"
                className="hover:bg-blue rounded-md border border-transparent bg-[#2189ff] py-2 px-3 text-sm font-medium text-white shadow-sm ring-offset-[#2c2d30] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                color={!errors && sentState ? 'success' : 'primary'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div>
                    Sending
                    <FontAwesomeIcon icon={faCircleNotch} size="sm" spin="spin" className="ml-2" />
                  </div>
                ) : !errors && sentState ? (
                  <div>
                    Sent
                    <FontAwesomeIcon icon={faCheck} size="sm" className="ml-2" />
                  </div>
                ) : (
                  <div>
                    Send
                    <FontAwesomeIcon icon={faPaperPlane} size="sm" className="ml-2" />
                  </div>
                )}
              </button>
            </div>
            <div />
            {errors && (
              <div>
                <p className="text-danger mb-0">Errors:</p>
                {errors.map((error) =>
                  error.field ? (
                    <p>
                      <span className="text-capitalize">{error.field}</span>: {error.message}
                    </p>
                  ) : (
                    <p>{error.message}</p>
                  ),
                )}
              </div>
            )}
            {!errors && sentState ? 'Your message has been sent!' : ''}
          </form>
        </div>
      </Container>
    </div>
  );
}
