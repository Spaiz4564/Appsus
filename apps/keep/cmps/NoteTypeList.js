export default {
  props: ['note'],
  template: `
 <h2>{{ note.info.title }}</h2>
<ul class="note-todos">

<li :class="note.info.todos[index].isDone ? 'line-through': ''" v-for="(todo,index) in note.info.todos">{{ todo.txt }}</li>

</ul>


    
    `,
}
