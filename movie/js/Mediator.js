/**
 * This class is used to mediate all JavaScript classes except the Main class.
 * It is needed because all classes have to communicate with each other through various events.
 * To decouple them from each other, the objects communicate indirectly with each other via this mediator.
 * The process corresponds to the design pattern of the mediator.
 * */
function Mediator() {

    /* This variable stores all members of the mediator. */
    let members = {}


    /**
     * This function allows objects to be added to the mediator. These are then called members of this mediator.
     * The passed object is stored in the member list with the key of its ID.
     *
     * @param {Object} member The object to add to the mediator as a member
     */
    this.addMember = function (member) {
        try {
            console.log("addMember: " + member.getID())
            members[member.getID()] = member;

        } catch (e) {
            console.log(e + `\n${member} has not the function getID or setMediator`)

        }

    }


    /**
     * This function allows members of the mediator to communicate with all other members.
     * The mediator transmit the message by calling the function
     * this.receive(msg: Object, fromMember: Object) in member toMember.
     *
     * @param {String} msg The message to be delivered.
     * @param {Object} fromMember Indicates from which member the message is transmitted.
     * @param {Object} toMember Indicates to which member the message should be sent.
     *
     * @returns {Object} Returns a message if necessary.
     */
    this.send = function (msg, fromMember, toMember) {
        try {
            //console.log(`send: ${msg}\n${fromMember} -> ${toMember}`);
            return members[toMember].receive(msg, fromMember);

        } catch (e) {
            console.log(e + `\n${toMember} not known or ${toMember} has no receive function`)

        }

    }
}