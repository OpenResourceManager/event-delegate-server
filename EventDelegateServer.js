var yaml = require('js-yaml')
var fs = require('fs')
var confFilePath = 'config/conf.yaml'
var server = require('http').Server()
var io = require('socket.io')(server)
var Redis = require('ioredis')
var config = null
var redis = null
var localRedis = null
var pid = require('daemon-pid')('/var/run/event-delegate-server.pid');

// var request = require('request')

/**
 *
 *
 * Functions
 *
 *
 */

function handleCreate(type, data) {
    switch (type) {
        case 'account':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_account', data)
            break
        case 'alias-account':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_alias_account', data)
            break
        case 'email':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_email', data)
            break
        case 'phone':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_phone', data)
            break
        case 'duty':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_duty', data)
            break
        case 'campus':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_campus', data)
            break
        case 'building':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_building', data)
            break
        case 'room':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_room', data)
            break
        case 'department':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_department', data)
            break
        case 'course':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_course', data)
            break;
        case 'load-status':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_load_status', data)
            break
        case 'school':
            console.log('Emitting create : "' + type + '" event...')
            io.emit('create_school', data)
            break
        default:
            console.log('Received an unknown create type: "' + type + '"')
    }
}

function handleUpdate(type, data) {
    switch (type) {
        case 'account':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_account', data)
            break
        case 'alias-account':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_alias_account', data)
            break
        case 'email':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_email', data)
            break
        case 'phone':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_phone', data)
            break
        case 'duty':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_duty', data)
            break
        case 'campus':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_campus', data)
            break
        case 'building':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_building', data)
            break
        case 'room':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_room', data)
            break
        case 'department':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_department', data)
            break
        case 'course':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_course', data)
            break
        case 'load-status':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_load_status', data)
            break
        case 'school':
            console.log('Emitting update : "' + type + '" event...')
            io.emit('update_school', data)
            break
        default:
            console.log('Received an unknown update type: "' + type + '"')
    }
}

function handleView(type, data) {
    switch (type) {
        case 'account':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_account', data)
            break
        case 'alias-account':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_alias_account', data)
            break
        case 'email':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_email', data)
            break
        case 'phone':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_phone', data)
            break
        case 'duty':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_duty', data)
            break
        case 'campus':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_campus', data)
            break
        case 'building':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_building', data)
            break
        case 'room':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_room', data)
            break
        case 'department':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_department', data)
            break
        case 'course':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_course', data)
            break
        case 'load-status':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_load_status', data)
            break
        case 'school':
            console.log('Emitting view : "' + type + '" event...')
            io.emit('view_school', data)
            break
        default:
            console.log('Received an unknown view type: "' + type + '"')
    }
}

function handleDelete(type, data) {
    switch (type) {
        case 'account':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_account', data)
            break
        case 'alias-account':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_alias_account', data)
            break
        case 'email':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_email', data)
            break
        case 'phone':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_phone', data)
            break
        case 'duty':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_duty', data)
            break
        case 'campus':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_campus', data)
            break
        case 'building':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_building', data)
            break
        case 'room':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_building', data)
            break
        case 'department':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_department', data)
            break
        case 'course':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_course', data)
            break
        case 'load-status':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_load_status', data)
            break
        case 'school':
            console.log('Emitting delete : "' + type + '" event...')
            io.emit('delete_school', data)
            break
        default:
            console.log('Received an unknown delete type: "' + type + '"')
    }
}

function handleRestore(type, data) {
    switch (type) {
        case 'account':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_account', data)
            break
        case 'alias-account':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_alias_account', data)
            break
        case 'duty':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_duty', data)
            break
        case 'campus':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_campus', data)
            break
        case 'building':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_building', data)
            break
        case 'room':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_room', data)
            break
        case 'department':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_department', data)
            break
        case 'course':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_course', data)
            break
        case 'load-status':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_load_status', data)
            break
        case 'school':
            console.log('Emitting restore : "' + type + '" event...')
            io.emit('restore_school', data)
            break
        default:
            console.log('Received an unknown restore type: "' + type + '"')
    }
}

function handleAssignment(type, to, data) {
    switch (type) {
        case 'duty':
            if (to === 'account') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('duty_account_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'campus':
            if (to === 'building') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('campus_building_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'building':
            if (to === 'room') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('building_room_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'room':
            if (to === 'account') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('room_account_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'department':
            if (to === 'account') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('department_account_assignment', data)
            } else if (to === 'course') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('department_course_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'course':
            if (to === 'account') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('course_account_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'school':
            if (to === 'account') {
                console.log('Emitting ' + type + ' assignment event to ' + to + '...')
                io.emit('school_account_assignment', data)
            } else {
                console.log('Received an unknown assignment subject: "' + to + '" no emission occurred.')
            }
            break
        default:
            console.log('Received an unknown assignment type: "' + type + '"')
    }
}

function handleUnassignment(type, to, data) {
    switch (type) {
        case 'duty':
            if (to === 'account') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('duty_account_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'campus':
            if (to === 'building') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('campus_building_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'building':
            if (to === 'room') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('building_room_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'room':
            if (to === 'account') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('room_account_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'department':
            if (to === 'account') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('department_account_unassignment', data)
            } else if (to === 'course') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('department_course_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'course':
            if (to === 'account') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('course_account_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        case 'school':
            if (to === 'account') {
                console.log('Emitting ' + type + ' unassignment event to ' + to + '...')
                io.emit('school_account_unassignment', data)
            } else {
                console.log('Received an unknown unassignment subject: "' + to + '" no emission occurred.')
            }
            break
        default:
            console.log('Received an unknown unassignment type: "' + type + '"')
    }
}

function handleEvent(message) {
    message = JSON.parse(message)
    var event = message.event
    var type = message.type
    var data = message.encrypted
    switch (event) {
        case 'created':
            handleCreate(type, data)
            break
        case 'updated':
            handleUpdate(type, data)
            break
        case 'viewed':
            handleView(type, data)
            break
        case 'deleted':
            handleDelete(type, data)
            break
        case 'restored':
            handleRestore(type, data)
            break
        case 'assigned':
            handleAssignment(type, message.to, data)
            break
        case 'unassigned':
            handleUnassignment(type, message.to, data)
            break
        default:
            console.log('Received an unknown event: "' + event + '"')
    }
}

/**
 *
 *
 * End Functions
 *
 *
 */

/**
 *
 *
 * Initialize And Read Configuration
 *
 *
 */

// Load the configuration from config file, or load default hard coded config
if (fs.existsSync(confFilePath)) {
    // Load the configuration from the config file
    config = yaml.safeLoad(fs.readFileSync(confFilePath, 'utf8'))
    // Info
    console.info('Loaded configuration file from : ' + confFilePath)
} else {
    // Load the default config
    config = {
        'server': {
            'listen_address': '127.0.0.1',
            'listen_port': 3000,
            'debug': true
        },
        'redis': {
            'host': '127.0.0.1',
            'port': 6379,
            'db': 0,
            'use_socket': false,
            'socket_path': null,
            'password': null
        }
    }
    // Warning about using the default config
    console.warn('Unable to find configuration file(' + confFilePath + ')... using default settings.')
}
// Read the debug variable
var debug = config.server.debug
// Notify that debugging is enabled
if (debug) console.log('Debugging enabled!\nCurrent Configuration:\n' + JSON.stringify(config))
// Are we connecting to a redis socket or using TCP?
if (config.redis.use_socket) {
    // Create a redis object that we will use to read incoming events
    redis = new Redis(config.redis.socket_path)
    // Create a redis object that allows us to store local objects
    localRedis = new Redis(config.redis.socket_path)
    // We are connected to redis socket
    console.info('Connected to Redis server on socket: ' + config.redis.socket_path)
} else {
    // Create a redis object that we will use to read incoming events
    redis = new Redis({
        port: config.redis.pass,
        host: config.redis.host,
        family: 4,
        password: config.redis.password,
        db: config.redis.db
    })
    // Create a redis object that allows us to store local objects
    localRedis = new Redis({
        port: config.redis.pass,
        host: config.redis.host,
        family: 4,
        password: config.redis.password,
        db: config.redis.db
    })
    // We are connected to redis server
    console.info('Connected to Redis server: ' + config.redis.host + ':' + config.redis.port)
}
// Subscribe to the events channel
redis.subscribe('events')

/**
 *
 *
 * End Configuration Section
 *
 *
 */

/**
 *
 *
 * Server Initialization
 *
 *
 */

/**
 * writes-out the pid file
 */
pid.write(function (err) {
    if (err) console.error('Something went wrong when creating the pid file!');
});

/**
 * on SIGTERM delete the pid file
 */
process.on('SIGTERM', function () {
    pid.delete(function (err) {
        if (err) console.error('Something went wrong when deleting the pid file! Does it exist?');
    });
});

/**
 * Messages from Redis server
 */
redis.on('message', function (channel, message) {
    switch (channel) {
        case 'events':
            handleEvent(message)
            break
        default:
            // Warn that we received a message on an unknown channel
            console.warn('Received request on unknown channel: "' + channel + '"... Is something else broadcasting on this Redis server/channel?')
            // Debug log the message
            if (debug) console.warn(message)
    }
})

/**
 * Messages from clients
 */
io.on('connection', function (socket) {
    socket.on('join', function (message) {
        var hostname = message.hostname
        var socketID = socket.id
        localRedis.set(hostname, JSON.stringify({
            'socket': socketID
        }))
        localRedis.set(socketID, JSON.stringify({
            'hostname': hostname
        }))
        if (debug) {
            console.log('Delegate: ' + hostname + ' has connected with socket: ' + socketID)
        } else {
            console.log('Delegate: ' + hostname + ' has connected')
        }
    })
    socket.on('disconnect', function () {
        var socketID = socket.id
        // Get the host by the socket ID
        localRedis.get(socketID, function (err, result) {
            if (err) console.error(err.stack)
            var host = JSON.parse(result)
            var hostname = host.hostname
            // Delete the entry with that socket ID as the key
            localRedis.del(socketID)
            localRedis.del(hostname)
            console.log(hostname + ' has disconnected')
            if (debug) console.log('Socket (' + socketID + ') closed')
        })
    })
})

server.listen(config.server.listen_port, config.server.listen_address)
console.info('Listening for connections on: ' + config.server.listen_address + ':' + config.server.listen_port)
