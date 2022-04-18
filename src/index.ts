import { Command, EnmitySectionID, ApplicationCommandType, ApplicationCommandInputType, ApplicationCommandOptionType } from "enmity-api/commands";
import { Plugin, registerPlugin } from "enmity-api/plugins";
import zalgo from "zalgo-js";
import { ZalgoOptions } from "zalgo-js";


const Zalgo: Plugin = {
  name: "Zalgo",
  commands: [],
  patches: [],

  onStart() {
    const zalgoCommand: Command = {
      id: "zalgo-command",
      applicationId: EnmitySectionID,

      name: "zalgo",
      displayName: "zalgo",

      description: "Unleash zalgo in your messsages",
      displayDescription: "Unleash zalgo in your messsages",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

      options: [{
        name: "message",
        displayName: "message",

        description: "Message to unleash zalgo in",
        displayDescription: "Message to unleash zalgo in",

        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "intensity",
        displayName: "intensity",
        
        description: "Controls the intensity of zalgo on a scale of 0-10",
        displayDescription: "Controls the intensity of zalgo on a scale of 0-10",

        type: ApplicationCommandOptionType.Integer,
        required: false
      },
      {
        name: "up",
        displayName: "up",
        
        description: "Controls whether zalgo will go up",
        displayDescription: "Controls whether zalgo will go up",

        type: ApplicationCommandOptionType.Boolean,
        required: false
      },
      {
        name: "middle",
        displayName: "middle",
        
        description: "Controls whether zalgo through the middle",
        displayDescription: "Controls whether through the middle",

        type: ApplicationCommandOptionType.Boolean,
        required: false
      },
      {
        name: "down",
        displayName: "down",
        
        description: "Controls whether zalgo will go down",
        displayDescription: "Controls whether zalgo will go down",

        type: ApplicationCommandOptionType.Boolean,
        required: false
      }],

      execute: function (args, _) {
        const message = args[0].value;
        let intensity = args[1]?.value ?? 5;
        intensity = intensity / 10;
        const up = args[2]?.value ?? true;
        const middle = args[3]?.value ?? false;
        const down = args[4]?.value ?? true;

        const options: ZalgoOptions = {
          intensity: intensity,
          
          directions: {
            up: up,
            middle: middle,
            down: down
          }
        }

        return {
          content: zalgo(message, options)
        }
      }
    }

    this.commands.push(zalgoCommand);
  },

  onStop() {

  }
}

registerPlugin(Zalgo);