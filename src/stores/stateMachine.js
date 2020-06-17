import { Machine, assign } from 'xstate';

const initialContext = {
    imageSrc: null,
    imageDimensions: { width: 0, height: 0 },
    parts: [],
    showPopup: false
};

const stateMachine = Machine(
    {
        initial: 'idle',
        states: {
            idle: {
                on: {
                    UPDATE: [
                        {
                            target: 'idle',
                            actions: 'update'
                        }
                    ]
                }
            }
        },
        on: {
            RESET: {
                target: 'idle',
                actions: 'reset'
            },
            POPUP: {
                target: 'idle',
                actions: 'popup'
            }
        }
    },
    {
        actions: {
            update: assign((ctx, e) => {
                return { ...ctx, ...e };
            }),
            reset: assign(initialContext),
            popup: assign((ctx, e) => {
                return { ...ctx, showPopup: !ctx.showPopup };
            })
        }
    },
    initialContext
);

export { stateMachine };
