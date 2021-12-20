import Entity from './ecs/Entity'
import Component from './ecs/Component'
import System from './ecs/System'

import Scene from './core/Scene'
import Service from './core/Service'
import Module from './core/Module'
import ModuleUI from './core/ModuleUI'
import ModuleRegister from './core/ModuleRegister'
import ServiceRegister from './core/ServiceRegister'

import * as UI from 'semantic-ui-react'
import Button from './ui/Button'
import Window from './ui/Window'
import Section from './ui/Section'

/** @namespace ECS */
const ECS = {
    Entity,
    Component,
    System
}

/** @namespace UI */
const BasicUI = {
    Button,
    Window,
    Section
}

export { Scene, Service, Module, ModuleUI, ModuleRegister, ServiceRegister, ECS, UI, BasicUI }