<script>  
var tooltipList1 = [].slice.call(document.querySelectorAll('[data-bs-toggle = "tooltip"]'))  
var tooltipList2 = tooltipList1.map(function (tooltipTriggerfun) {  
  return new bootstrap.Tooltip(tooltipTriggerfun)  
})  
</script>  